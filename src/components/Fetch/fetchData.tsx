import axios from "axios";
interface Options {
    label: string;
    value: string;
}
//The file contains a component that receives data from the API and passes it to the main component
export const getData = () => {
    return axios.get('https://60816d9073292b0017cdd833.mockapi.io/modes')
        .then((response) => {
            const options: Options[] = response.data.map(({ name, field }: { name: string; field: string }) => ({
                label: name,
                value: field,
            }));
            return options;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};
