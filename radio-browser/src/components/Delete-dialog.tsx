import { Button } from './ui/button';
import { Trash } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from './ui/alert-dialog';


interface DeleteDialogProps {
    stationuuid: string;
    onDelete: () => void;
    onConfirmDelete: (stationuuid: string) => void;
}

const DeleteRadioDialog = ({ stationuuid, onDelete, onConfirmDelete }: DeleteDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size="icon"
                    className="bg-transparent hover:text-white"
                    onClick={() => onConfirmDelete(stationuuid)}
                >
                    <Trash className="text-black hover:text-white" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja remover essa rádio?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Tem certeza de que deseja
                        remover a rádio dos seus favoritos?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>
                        Sim, remover
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteRadioDialog;
