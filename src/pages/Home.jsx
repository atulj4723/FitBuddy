import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const workoutPage = () => {
        navigate("/workout");
    };
    const fitnesPage = () => {
        navigate("/activity");
    };
    const dietPage = () => {
        navigate("/diet");
    };
    const dailyPage = () => {
        navigate("/schedule");
    };

    return (
        <div className="home">
            <div className="home_icon">
                <div className="fit_buddy">
                    <h1 className="home_h1">FITNESS BUDDY</h1>
                    
                    <pre className="home_h2">
                        {" "}
                        "Y O U R F I T N E S S J O U R N E Y S T A R T S H E R E
                        !"
                    </pre>
                </div>
                <div className="f1">
                    <button className="Workouts" onClick={workoutPage}>
                        <FontAwesomeIcon icon={faDumbbell} className="dumb" />
                        <b>Workouts</b>
                    </button>
                    <button className="fit" onClick={fitnesPage}>
                        <FontAwesomeIcon
                            icon={faPersonRunning}
                            className="fiti"
                        />
                        <b>Fitness Activity</b>
                    </button>
                </div>
                <div className="f2">
                    <button className="Diet" onClick={dietPage}>
                        <FontAwesomeIcon icon={faUtensils} className="dieti" />
                        <b>Diet Plans</b>
                    </button>
                    <button className="Schedule" onClick={dailyPage}>
                        <FontAwesomeIcon
                            icon={faCalendarWeek}
                            className="schei"
                        />
                        <b>Daily Schedule</b>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Home;
