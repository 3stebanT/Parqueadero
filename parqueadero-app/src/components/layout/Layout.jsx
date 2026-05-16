import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px", background: "#f5f6fa" }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;