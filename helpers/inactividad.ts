import { signOut } from "next-auth/react";

export const inactivityTime = function () {
    let time: string | number | NodeJS.Timeout | undefined;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    function logout() {
     
        alert("Su session ah expirado")
        // signOut()
        //location.href = 'logout.html'
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, 60000)
        // 1000 milliseconds = 1 second
    }
};
