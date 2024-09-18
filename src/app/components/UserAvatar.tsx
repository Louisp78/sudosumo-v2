import clsx from "clsx"
import Image, { ImageProps } from "next/image"

export default function UserAvatar({ size, avatarUrl, className, ...rest }:
    { size: number, avatarUrl: string | null | undefined, className: string, rest?: ImageProps }) {

    return (
        <>
            {/* TODO: see for image resolution with query params */}
            <Image
                src={avatarUrl ?? '/next.svg'}
                width={size}
                height={size}
                alt="User Avatar"
                className={clsx(`rounded-full object-cover border-4 border-orange-400`, className)}
                {...rest}
            />
        </>
    )
}
