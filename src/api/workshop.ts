import axios, { AxiosResponse } from "axios";
import { getAuthTokenFromCookies } from "../util/auth";

interface NewCraftshopProps {
  craftshopName: string;
  zoneCode: string;
  baseAddress: string;
  addtionalAddress: string;
  detailAddress: string;
  phoneNumber: string;
}

interface Response {
  id: string;
  name: string;
  postCode: string;
  address: string;
  detailAddress: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export async function addNewCraftshop({
  craftshopName,
  zoneCode,
  baseAddress,
  addtionalAddress,
  detailAddress,
  phoneNumber,
}: NewCraftshopProps): Promise<Response> {
  const URL = `${process.env.REACT_APP_SERVER_BASE_URL}/admin/craftshop`;
  const accessToken = getAuthTokenFromCookies("user_access_token");
  const bodyProps = {
    name: craftshopName,
    postCode: zoneCode,
    address: baseAddress + addtionalAddress,
    detailAddress: detailAddress,
    phone: phoneNumber,
  };

  const response = await axios.post<string, AxiosResponse<Response>>(
    URL,
    JSON.stringify(bodyProps),
    {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  console.log(response.data);
  return response.data;
}
