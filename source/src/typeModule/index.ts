import React from 'react';

export type TCustomerMembership = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type TCustomerMembershipProps = TCustomerMembership & { maskEmail: (email: string) => Promise<string> };

export interface IReactNode { children: React.ReactNode };

type TSupport = { url: string, text: string}

export interface IPurchaseMembershipsApi {
  support: TSupport
  total: number,
  total_pages: number,
  page: number,
  per_page: number,
  data: TCustomerMembership[]
}