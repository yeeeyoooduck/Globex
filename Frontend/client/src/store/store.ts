import UserService from "../services/UserService";

export default class Store {
    async fetchUsers() {
        try {
            const response = await UserService.fetchUsers();
            return response.data;
        } catch (error: any) {
            console.error(error.response?.data?.message);
        }
    }

    async fetchSortUsers(searchQuery: string) {
        try {
            const response = await UserService.fetchSortUsers(searchQuery);
            return response.data;
        } catch (error: any) {
            console.error(error.response?.data?.message);
        }
    }

}