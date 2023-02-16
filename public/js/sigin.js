async function Auth() {
    const fetchCheck = await fetch(`http://localhost:3000`);
    const res = await fetchCheck.json();
    if (res.location == "/auth") {
        window.location = "/auth";
    }
}
Auth()