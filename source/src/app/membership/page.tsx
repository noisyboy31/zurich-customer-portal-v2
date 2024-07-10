import CustomerMembership from '../../components/customerMembership';
import { IPurchaseMembershipsApi, TCustomerMembership } from '../../typeModule';
import { Container, Box, List, ListItem } from '@mui/material';
import axios from 'axios'

const maskEmail = async (email: string): Promise<string> => {
  "use server"
  return email.replace(/./g, '*');
}

const getPurchaseMembershipsApi = async (pageNumber: number = 1) => {
  const url: string = `https://reqres.in/api/users?page=${pageNumber}`

  try {
    const response = await axios.get<IPurchaseMembershipsApi>(url);
    const res = response?.data || null;
    return res; 
  } catch (error) {
    console.error('Error fetching membership:', error);
    throw error;
  }
}

const getBalancePages = async (pageNumber: number, total_pages: number, data: TCustomerMembership[]): Promise<TCustomerMembership[]> => {
  const pagination: Promise<IPurchaseMembershipsApi>[] = [];

  for (let i = pageNumber + 1; i <= total_pages; i++) {
    pagination.push(getPurchaseMembershipsApi(i));
  }

  await Promise.all(pagination)
    .then((responses) => {
      responses.forEach((res) => {
        data.push(...res.data);
      });
    })
    .catch((error) => {
      console.error('Error fetching balancePages:', error);
      throw new Error(error);
    });

  return data;
}

const getFlatMemberships = (data: TCustomerMembership[]): TCustomerMembership[] => data.filter(member => /^G/.test(member.first_name) || /^W/.test(member.last_name));

const getMemberships = async (): Promise<TCustomerMembership[]> => {
  try {
    const { pageNumber, total_pages, data } = await getPurchaseMembershipsApi();
    await getBalancePages(pageNumber, total_pages, data);
    
    const membership = getFlatMemberships(data);
    return membership;

  } catch (error) {
    console.error('Error fetching memberships:', error);
    throw error; 
  }
}

const Membership = async () => {
  const renderMemberships = await getMemberships();

  return (
    <Container sx={{ p: 4, mb: 16 }}>
      <List>
        {renderMemberships?.map((renderMembership) => (
          <ListItem key={renderMembership?.id}>
            <CustomerMembership {...renderMembership} maskEmail={maskEmail} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Membership