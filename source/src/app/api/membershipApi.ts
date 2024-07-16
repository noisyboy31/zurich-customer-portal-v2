import axios from 'axios';
import { IPurchaseMembershipsApi, TCustomerMembership } from '../../typeModule';

export const maskEmail = async (email: string): Promise<string> => { 
  const maskedEmail = email.replace(/^(.)(.*)(.@.*)$/, (_, firstChar, middleChars, domain) => {
    return firstChar + middleChars.replace(/./g, '*') + domain;
  });
  return maskedEmail;
};

export const getPurchaseMembershipsApi = async (page?: number) => {
  const url: string = `https://reqres.in/api/users${page ? `?page=${page}` : ''}`;

  try {
    const response = await axios.get<IPurchaseMembershipsApi>(url);
    const res = response?.data || null;
    return res; 
  } catch (error) {
    console.error('Error fetching membership:', error);
    throw error;
  }
}

export const getBalancePages = async (
  page: number, 
  per_page: number, 
  total: number, 
  data: TCustomerMembership[]
): Promise<TCustomerMembership[]> => {
  const pagination: Promise<IPurchaseMembershipsApi | null>[] = [];
  const totalPages = Math.ceil(total / per_page);

  for (let i = page + 1; i <= totalPages; i++) {
    pagination.push(getPurchaseMembershipsApi(i));
  }

  const responses = await Promise.all(pagination);
  responses.forEach(res => {
    if (res && res.data) {
      res.data.forEach(item => {
        if (!data.some(existing => existing.id === item.id)) {
          data.push(item);
        }
      });
    }
  });

  return data;
}

export const getFlatMemberships = (data: TCustomerMembership[]): TCustomerMembership[] => {
  const filteredMemberships = data.filter(member => /^G/i.test(member.first_name) || /^W/i.test(member.last_name));
  return filteredMemberships.sort((a, b) => {
    const nameA = `${a.first_name.toUpperCase()}  ${a.last_name.toUpperCase()}`;
    const nameB = `${b.first_name.toUpperCase()}  ${b.last_name.toUpperCase()}`
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return nameA.localeCompare(nameB);
  });
}

export const getMemberships = async (page?: number, per_page: number = 6): Promise<{ page: number, per_page: number, total_pages: number, total: number, data: TCustomerMembership[] }> => {
  try {
    const initialResponse = await getPurchaseMembershipsApi(page);
    if (!initialResponse || !initialResponse.data) throw new Error("Failed to fetch initial memberships");

    const { page: currentPage, per_page: initialPerPage, total, data } = initialResponse;
    const memberships = await getBalancePages(currentPage, initialPerPage, total, data);

    const filteredMemberships = getFlatMemberships(memberships.slice(0, per_page));
    return {
      page: currentPage,
      per_page: initialPerPage,
      total_pages: Math.ceil(total / initialPerPage),
      total,
      data: filteredMemberships
    };
  } catch (error) {
    console.error('Error fetching memberships:', error);
    throw error;
  }
};