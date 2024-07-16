import axios from 'axios';
import { 
    maskEmail, 
    getMemberships, 
    getFlatMemberships,
    getBalancePages ,
} from '../../app/api/membershipApi';

jest.mock('axios');

describe('maskEmail function', () => {
  it('should mask an email address correctly', async () => {
    const email = 'example@example.com';
    const masked = await maskEmail(email);
    expect(masked).toEqual('e*****e@example.com');
  });

  it('should handle empty email gracefully', async () => {
    const email = '';
    const masked = await maskEmail(email);
    expect(masked).toEqual('');
  });
});

describe('getMemberships function', () => {
  beforeEach(() => {
    axios.get.mockReset(); // Reset mock before each test
  });

  it('should fetch memberships and flatten them correctly', async () => {
    const mockResponse = {
      page: 1,
      per_page: 3,
      total_pages: 2,
      total: 5,
      data: [
        { id: 1, first_name: 'John', last_name: 'Doe' },
        { id: 2, first_name: 'Jane', last_name: 'Smith' },
        { id: 3, first_name: 'William', last_name: 'Garcia' },
        { id: 4, first_name: 'George', last_name: 'Washington' },
        { id: 5, first_name: 'Walter', last_name: 'White' }
      ]
    };

    axios.get.mockResolvedValue({ data: mockResponse });

    const memberships = await getMemberships();
    expect(memberships.data.length).toEqual(2);
    expect(memberships.data[0].first_name).toEqual('George');
    expect(memberships.data[1].last_name).toEqual('White');
    // Add more assertions as needed
  });

  it('should handle errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch'));

    await expect(getMemberships()).rejects.toThrow('Failed to fetch');
  });
});

describe('getFlatMemberships function', () => {
  it('should filter and sort memberships correctly', () => {
    const memberships = [
      { id: 1, first_name: 'George', last_name: 'Washington' },
      { id: 2, first_name: 'William', last_name: 'Garcia' },
      { id: 3, first_name: 'John', last_name: 'Doe' },
      { id: 4, first_name: 'Jane', last_name: 'Smith' },
      { id: 5, first_name: 'Walter', last_name: 'White' }
    ];

    const filtered = getFlatMemberships(memberships);
    expect(filtered.length).toEqual(2); 
    expect(filtered[0].first_name).toEqual('George');
    expect(filtered[0].last_name).toEqual('Washington');
  });
});

describe('getBalancePages function', () => {
  it('should fetch additional pages and append data correctly', async () => {
    const page = 1;
    const per_page = 2;
    const total = 5;
    const initialData = [
      { id: 1, first_name: 'John', last_name: 'Doe' },
      { id: 2, first_name: 'Jane', last_name: 'Smith' }
    ];

    axios.get.mockResolvedValue({ data: { data: [{ id: 3, first_name: 'William', last_name: 'Garcia' }] } });

    const result = await getBalancePages(page, per_page, total, initialData);
    expect(result.length).toEqual(3); // Adjust based on your expected result
    expect(result[2].first_name).toEqual('William');
    // Add more assertions as needed
  });
});
