import AppRoutes from "@/routes";
import Providers from "@/providers";

function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}

export default App;
