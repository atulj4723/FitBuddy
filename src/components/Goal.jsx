
const Goal = ({ setGoal, goal }) => {
    const list = ["Gain Weight", "Maintain Weight", "Loss weight"];
    return (
        <div className="">
            {list.map((cur, idx) => {
                return (
                    <div
                    key={idx}
                    className={`${goal==cur?"select":"no"}`}
                        onClick={() => {
                            setGoal(cur);
                        }}>
                        {cur}
                    </div>
                );
            })}
        </div>
    );
};
export default Goal;