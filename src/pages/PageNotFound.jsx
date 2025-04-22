import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <button
                onClick={() => {
                    navigate("/");
                }}>
                Return home
            </button>
        </div>
    );
};
export default PageNotFound;
