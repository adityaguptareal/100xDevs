import { TextInput } from "@repo/ui/TextInput";

export default function ChatRoom() {
    return (
        <div style={{
            width: "100%",
            height: "98vh",
            display: "flex",
            flexDirection: 'column',
            justifyContent: "space-between"
        }}>
            <div>
                This is Chat Room
            </div>
            <div>
                <TextInput placeholder="Enter Chat" />
            </div>
        </div>

    )
}