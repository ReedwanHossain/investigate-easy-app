export enum RequestStatus {
    CREATED = "CREATED",
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    DECLINED = "DECLINED",
  }
  
  export enum Roles {
    USER = "USER",
    REQUESTER = "REQUESTER",
    INVESTIGATOR = "INVESTIGATOR",
    ADMIN = "ADMIN",
  }
  
  export interface User {
    id: string;
    email: string;
    name: string;
    phone?: string;
    roles: Roles[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Request {
    id: string;
    title: string;
    description: string;
    location: string;
    status: RequestStatus;
    requester: User;
    requesterId: string;
    investigator?: User;
    investigatorId?: string;
    createdAt: string;
    updatedAt: string;
    messages?: Message[];
    report?: Report;
    reviews?: Review[];
  }
  
  export interface Message {
    id: string;
    content: string;
    requestId: string;
    sender: User;
    senderId: string;
    createdAt: string;
  }
  
  export interface Report {
    id: string;
    content: string;
    requestId: string;
    investigator: User;
    investigatorId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Review {
    id: string;
    rating: number;
    comment?: string;
    reviewer: User;
    reviewerId: string;
    investigator: User;
    investigatorId: string;
    request: Request;
    requestId: string;
    createdAt: string;
  }