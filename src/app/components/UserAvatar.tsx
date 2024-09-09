import { auth } from "../auth";
import Image from "next/image";

export default function UserAvatar(props: (BaseProps & { size: number; avatarUrl: string | null | undefined })) {

    return (
        <>
            {/* TODO: see for image resolution with query params */}
            <Image
                src={props.avatarUrl ?? '/next.svg'}
                width={props.size}
                height={props.size}
                alt="User Avatar"
                className={`rounded-full object-cover border-4 border-orange-400 ${props.className}`}
            />
        </>
    )
}