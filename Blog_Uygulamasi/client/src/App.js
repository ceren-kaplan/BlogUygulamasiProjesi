import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MakaleListesi from "./components/MakaleListesi";
import MakaleEkle from "./components/MakaleEkle";
import Baslik from "./components/Baslik";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache, ApolloClient } from "@apollo/client";
import MakaleDetay from "./components/MakaleDetay";

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Baslik />
        <Routes>
          <Route exact path="/" element={<MakaleListesi />} />
          <Route path="/ekle" element={<MakaleEkle />} />
          <Route path="/makale/:id" element={<MakaleDetay />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
