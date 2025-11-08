
import Button from '@mui/material/Button';
import {useNotify} from "../NotifyProvider.tsx";

export default function SecondaryButton({text} : {text: string})  {
    const notify=useNotify();
    return (
        <Button
            variant="outlined"
            color="primary"
            onClick={() => notify('SecondaryButton clicked!',"success")}
        >
            {text}
        </Button>
    );
}
