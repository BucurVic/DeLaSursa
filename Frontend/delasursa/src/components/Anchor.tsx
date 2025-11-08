import Link from '@mui/material/Link';

export default function Anchor({ text, link }: { text: string; link: string }) {
    const href = link.startsWith('http') ? link : `https://${link}`;
    return (
        <Link href={href} underline="always" target="_blank">
            {text}
        </Link>
    );
}