# Seat Layout

I created a function to make it easier to generate the layout !

```javascript
const layoutOfRow = "3 4 2";
const numRows = 4;
const premiumLine = 2;

const layout = generateLayout(layoutOfRow, numRows, premiumLine);
console.log(layout);
```

# Example usage

const ticketInfo = {
ticketId: "123456",
username: "John Doe",
eventName: "Movie Night",
eventId: "789012",
guildId: "345678",
guildName: "Awesome Server",
dateTime: "2023-05-15 19:00",
ticketPrice: "$10",
eventAuthor: "Jane Smith",
botName: "TicketBot",
};

    const ticket = new CartoonyCinemaTicket(ticketInfo);
    ticket.generateTicket();
