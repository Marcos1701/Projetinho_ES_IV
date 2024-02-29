interface Props {
    onClick: () => void;
}


function CloseButton({onClick} : Props) {
    return (
        <button type="button" className="btn-close" aria-label="Close" onClick={onClick}></button>
    );
}


export default CloseButton;