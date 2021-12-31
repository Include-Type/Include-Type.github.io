import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import "./AdminPage.css";
import { Link } from "react-router-dom";

export default function AdminPage() {
  return (
    <div id="admin_panel" className="d-flex justify-content-center">
      <div className="admin_container">
        <div className="admin_title">
          Admin Panel
          <hr className="text-muted" />
        </div>
        <Link to="/new_update_project">
          <Button variant="contained" startIcon={<AddRoundedIcon />}>
            New Project
          </Button>
        </Link>
      </div>
    </div>
  );
}
