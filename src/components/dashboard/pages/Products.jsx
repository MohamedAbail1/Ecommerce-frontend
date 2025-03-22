import ProductList from "../components/ProductList";
import Header from "../components/Header";

export default function Products() {
  return (
    <div>
      <Header title="Manage Products" />
      <ProductList />
    </div>
  );
}
