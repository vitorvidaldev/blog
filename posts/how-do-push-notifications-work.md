# How do push notifications work?

Push notifications work through a system involving servers, operating systems, and apps that enables messages to be delivered to devices even when the target app isn't actively running.

### Basic flow
1. Device registration: When you install an app, it registers with the device's push notification service (Apple Push Notification Service for iOS, Firebase Cloud Messaging for Android). The service generates a unique token that identifies that specific app installation on your device.
2. Sending process: When a server wants to send you a notification, it sends a message along with your device token to the push notification service.
3. Delivery and display: Your device's operating system receives the notification and displays it according to your settings and the app's configuration.

The system uses persistent TCP connections and protocols like HTTP/2 to efficiently deliver messages. Push services maintain connections to millions of devices simultaneously and can queue messages when devices are offline. They also handle features such as message expiration, priority levels, and read receipts.

Rather than each app maintaining its own connection to check for updates, this centralized system means your device only needs one connection per platform, which significantly conserves battery life.

### Security and Privacy
Push notification services use authentication and encryption to ensure that only authorized servers can send notifications to your device. The unique device token is kept private and should not be shared. Additionally, the content of notifications can be encrypted to protect sensitive information.

### User Control
Users have control over which apps can send them notifications. Most operating systems allow you to opt in or out of notifications, choose the types of notifications you receive (such as banners, sounds, or badges), and configure how and when they are displayed.

### Types of Notifications
- **Visible notifications:** Alerts, banners, or badges that appear on your device's screen.
- **Silent/background notifications:** Data-only messages that update app content in the background without alerting the user directly.

### Use Cases
- Messaging apps delivering new message alerts
- News apps sending breaking news updates
- Calendar apps reminding you of upcoming events
- E-commerce apps notifying you of sales or order status

### Limitations and Challenges
- Delivery is not always guaranteed; notifications may be delayed or dropped due to network issues or device restrictions.
- Some devices or operating systems may impose limits on the number or frequency of notifications.
- Users may disable notifications, affecting app engagement.


---

*Tags: Push notifications, system design*