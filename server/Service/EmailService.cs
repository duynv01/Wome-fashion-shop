using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Options;
using server.Models;
using server.Service;


public class EmailService : IEmailService
{
    private readonly EmailSettings _emailSettings;

    public EmailService(IOptions<EmailSettings> emailSettings)
    {
        _emailSettings = emailSettings.Value;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        var email = new MimeMessage();
        email.From.Add(new MailboxAddress(_emailSettings.FromName, _emailSettings.FromAddress));
        email.To.Add(new MailboxAddress("", toEmail));
        email.Subject = subject;

        var builder = new BodyBuilder { HtmlBody = body };
        email.Body = builder.ToMessageBody();

        using var smtp = new SmtpClient();
        smtp.Connect(_emailSettings.SmtpServer, _emailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
        smtp.Authenticate(_emailSettings.Username, _emailSettings.Password);

        await smtp.SendAsync(email);
        smtp.Disconnect(true);
    }
}
