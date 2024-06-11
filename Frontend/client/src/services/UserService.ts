import $api from "../http"
import {AxiosResponse} from "axios"
import {FetchUsersResponse} from "../models/response/FetchUsersResponse";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<FetchUsersResponse[]>> {
        return $api.get<FetchUsersResponse[]>("/")
    }

    static fetchSortUsers(searchQuery: string): Promise<AxiosResponse<FetchUsersResponse>> {
        return $api.get<FetchUsersResponse>(`?term=${searchQuery}`)
    }
}
