import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <button
                onClick={() => {
                    navigate("/");
                }}>
                Return home
            </button>
        </>
    );
};
export default PageNotFound;
