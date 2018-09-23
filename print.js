// print to console
const printMessage = (username, badgeCount, point) => {
    const message = `${username} has ${badgeCount} total badges and ${point} total points`;

    console.log(message);
}

export const print = printMessage;