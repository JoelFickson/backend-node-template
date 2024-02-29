interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface APIResponse<T> {
  data: T;
  message: string;
  status: string;
}


