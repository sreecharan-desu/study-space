type ButtonTypes = {
    button_value: string;
    onclickFunction: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Sign({ button_value, onclickFunction }: ButtonTypes) {
    return (
        <>
            <input
                type="button"
                className="py-2 px-16 m-2 rounded-md cursor-pointer hover:bg-black hover:text-white font-bold"
                value={button_value}
                style={{ border: '2px solid black' }}
                onClick={onclickFunction}
            />
        </>
    );
}
