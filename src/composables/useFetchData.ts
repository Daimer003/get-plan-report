import { ref, onMounted } from "vue";
import axios from "axios";

//@ts-ignore
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // URL desde .env

// Composable para obtener datos de la API
export function useFetchData(id: string | number, type: string = "INTERVIEW") {
  const data = ref<any>(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  const fetchData = async () => {

    if (!id) {
      error.value = "No se proporcionó un ID válido.";
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get(`${apiBaseUrl}/webhook/v1/reports?type=${type}&id=${id}`);
      data.value = response.data;
       console.log(response)
   
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message || "Error al obtener los datos";
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchData);

  return { data, error, loading, refetch: fetchData };
}