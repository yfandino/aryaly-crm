import Header from "./Header";
import Nav from "./Nav";

export default function Page({ children }) {
  return (
    <>
      <Nav />
      <div className="ml-16">
        <Header />
        <div className="bg-gray-100 py-6 min-h-screen-with-bar">
          {children}
        </div>
      </div>
    </>
  );
}
