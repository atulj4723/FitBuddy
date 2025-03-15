const Diet = ({ setDiet, diet }) => {
    const list = ["vegeaterian", "eggeaterian", "nonvegeaterian"];
    
    return (
        <div className="">
            {list.map((cur, idx) => {
                return (
                    <div
                    key={idx}
                    className={`${diet==cur?"select":"no"}`}
                        onClick={() => {
                            setDiet(cur);
                        }}>
                        {cur}
                    </div>
                );
            })}
        </div>
    );
};
export default Diet;