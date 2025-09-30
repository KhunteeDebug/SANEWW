export default async function togglePC(PC_ID: string, enable: boolean) {
    try {
        const res = await fetch("/api/pcManage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ PC_ID, enable }),
        });

        if (!res.ok) {
            // console.error("Failed to toggle PC:", res.status, res.statusText);
            return null;
        }

        const text = await res.text();
        console.log("Raw response:", text);

        const data = text ? JSON.parse(text) : {};
        console.log("UpdatePC Response:", data);

        return data;
    } catch (err) {
        // console.error("Error updating PC:", err);
        return null;
    }
}
