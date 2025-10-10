# Supabase Email Templates

Professional email templates for Grovio using brand colors and styling.

## Brand Colors
- Primary Orange: #D35F0E
- Navy Blue: #1e3a8a
- Light Gray: #f8fafc
- Dark Gray: #64748b

---

## 1. Confirm Signup

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Your Signup - Grovio</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #D35F0E 0%, #b84d0a 100%); padding: 30px; text-align: center;">
            <img src="https://grovio-gamma.vercel.app/logo.png" alt="Grovio" style="height: 50px; margin-bottom: 15px;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Welcome to Grovio!</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <h2 style="color: #1e3a8a; font-size: 24px; margin: 0 0 20px 0; text-align: center;">Confirm Your Account</h2>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                Hi there! Thank you for signing up with Grovio. We're excited to help you discover amazing groceries with our AI-powered shopping assistant.
            </p>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                To complete your registration and start shopping, please confirm your email address by clicking the button below:
            </p>
            
            <div style="text-align: center; margin: 35px 0;">
                <a href="{{ .ConfirmationURL }}" style="background-color: #D35F0E; color: white; text-decoration: none; padding: 15px 40px; border-radius: 25px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 8px rgba(211, 95, 14, 0.3);">
                    Confirm Your Email
                </a>
            </div>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <p style="color: #64748b; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">Confirmation Link:</p>
                <p style="color: #1e3a8a; font-size: 12px; word-break: break-all; margin: 0;">{{ .ConfirmationURL }}</p>
            </div>
            
            <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin: 30px 0 0 0;">
                If you didn't create an account with Grovio, you can safely ignore this email.
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #1e3a8a; color: white; padding: 25px; text-align: center;">
            <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Happy Shopping!</p>
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">The Grovio Team</p>
        </div>
    </div>
</body>
</html>
```

---

## 2. Invite User

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You're Invited to Grovio</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #D35F0E 0%, #b84d0a 100%); padding: 30px; text-align: center;">
            <img src="https://grovio-gamma.vercel.app/logo.png" alt="Grovio" style="height: 50px; margin-bottom: 15px;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">You're Invited!</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <h2 style="color: #1e3a8a; font-size: 24px; margin: 0 0 20px 0; text-align: center;">Join Grovio Today</h2>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                You've been invited to join Grovio, the smart grocery shopping platform that uses AI to help you find the perfect products for your needs.
            </p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h3 style="color: #1e3a8a; margin: 0 0 15px 0; font-size: 18px;">What you'll get:</h3>
                <ul style="color: #64748b; margin: 0; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">AI-powered product recommendations</li>
                    <li style="margin-bottom: 8px;">Smart shopping lists and meal planning</li>
                    <li style="margin-bottom: 8px;">Exclusive deals and discounts</li>
                    <li style="margin-bottom: 0;">Fast and reliable delivery</li>
                </ul>
            </div>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Ready to revolutionize your grocery shopping? Click the button below to accept your invitation:
            </p>
            
            <div style="text-align: center; margin: 35px 0;">
                <a href="{{ .ConfirmationURL }}" style="background-color: #D35F0E; color: white; text-decoration: none; padding: 15px 40px; border-radius: 25px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 8px rgba(211, 95, 14, 0.3);">
                    Accept Invitation
                </a>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #1e3a8a; color: white; padding: 25px; text-align: center;">
            <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Welcome to the Future of Grocery Shopping!</p>
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">The Grovio Team</p>
        </div>
    </div>
</body>
</html>
```

---

## 3. Magic Link

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Magic Link - Grovio</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #D35F0E 0%, #b84d0a 100%); padding: 30px; text-align: center;">
            <img src="https://grovio-gamma.vercel.app/logo.png" alt="Grovio" style="height: 50px; margin-bottom: 15px;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Your Magic Link</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <h2 style="color: #1e3a8a; font-size: 24px; margin: 0 0 20px 0; text-align: center;">Quick & Secure Access</h2>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                You requested a magic link to access your Grovio account. This link will automatically sign you in without needing a password.
            </p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #D35F0E;">
                <p style="color: #1e3a8a; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">🔒 Security Note:</p>
                <p style="color: #64748b; font-size: 14px; margin: 0;">This link is valid for 1 hour and can only be used once. If you didn't request this link, please ignore this email.</p>
            </div>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Click the button below to access your account:
            </p>
            
            <div style="text-align: center; margin: 35px 0;">
                <a href="{{ .ConfirmationURL }}" style="background-color: #D35F0E; color: white; text-decoration: none; padding: 15px 40px; border-radius: 25px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 8px rgba(211, 95, 14, 0.3);">
                    Access My Account
                </a>
            </div>
            
            <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin: 30px 0 0 0;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <span style="color: #1e3a8a; word-break: break-all;">{{ .ConfirmationURL }}</span>
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #1e3a8a; color: white; padding: 25px; text-align: center;">
            <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Secure & Convenient</p>
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">The Grovio Team</p>
        </div>
    </div>
</body>
</html>
```

---

## 4. Change Email Address

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Email Change - Grovio</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #D35F0E 0%, #b84d0a 100%); padding: 30px; text-align: center;">
            <img src="https://grovio-gamma.vercel.app/logo.png" alt="Grovio" style="height: 50px; margin-bottom: 15px;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Email Change Request</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <h2 style="color: #1e3a8a; font-size: 24px; margin: 0 0 20px 0; text-align: center;">Confirm Your New Email</h2>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                We received a request to change the email address for your Grovio account. To complete this change, please confirm your new email address.
            </p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <p style="color: #1e3a8a; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">Current Email:</p>
                <p style="color: #64748b; font-size: 14px; margin: 0 0 15px 0;">{{ .Email }}</p>
                <p style="color: #1e3a8a; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">New Email:</p>
                <p style="color: #64748b; font-size: 14px; margin: 0;">This email address</p>
            </div>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Click the button below to confirm this email change:
            </p>
            
            <div style="text-align: center; margin: 35px 0;">
                <a href="{{ .ConfirmationURL }}" style="background-color: #D35F0E; color: white; text-decoration: none; padding: 15px 40px; border-radius: 25px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 8px rgba(211, 95, 14, 0.3);">
                    Confirm Email Change
                </a>
            </div>
            
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 25px 0;">
                <p style="color: #856404; font-size: 14px; margin: 0; font-weight: 600;">⚠️ Security Alert</p>
                <p style="color: #856404; font-size: 14px; margin: 5px 0 0 0;">If you didn't request this email change, please contact our support team immediately.</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #1e3a8a; color: white; padding: 25px; text-align: center;">
            <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Keep Your Account Secure</p>
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">The Grovio Team</p>
        </div>
    </div>
</body>
</html>
```

---

## 5. Reset Password

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - Grovio</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #D35F0E 0%, #b84d0a 100%); padding: 30px; text-align: center;">
            <img src="https://grovio-gamma.vercel.app/logo.png" alt="Grovio" style="height: 50px; margin-bottom: 15px;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Password Reset</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <h2 style="color: #1e3a8a; font-size: 24px; margin: 0 0 20px 0; text-align: center;">Reset Your Password</h2>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                We received a request to reset the password for your Grovio account. If you made this request, click the button below to create a new password.
            </p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #D35F0E;">
                <p style="color: #1e3a8a; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">🔐 Security Information:</p>
                <ul style="color: #64748b; font-size: 14px; margin: 0; padding-left: 20px;">
                    <li style="margin-bottom: 5px;">This link expires in 1 hour</li>
                    <li style="margin-bottom: 5px;">Can only be used once</li>
                    <li style="margin-bottom: 0;">If you didn't request this, ignore this email</li>
                </ul>
            </div>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Click the button below to reset your password:
            </p>
            
            <div style="text-align: center; margin: 35px 0;">
                <a href="{{ .ConfirmationURL }}" style="background-color: #D35F0E; color: white; text-decoration: none; padding: 15px 40px; border-radius: 25px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 8px rgba(211, 95, 14, 0.3);">
                    Reset My Password
                </a>
            </div>
            
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 25px 0;">
                <p style="color: #856404; font-size: 14px; margin: 0; font-weight: 600;">⚠️ Important:</p>
                <p style="color: #856404; font-size: 14px; margin: 5px 0 0 0;">If you didn't request a password reset, please ignore this email. Your account remains secure.</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #1e3a8a; color: white; padding: 25px; text-align: center;">
            <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Stay Secure</p>
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">The Grovio Team</p>
        </div>
    </div>
</body>
</html>
```

---

## 6. Reauthentication

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Re-authentication Required - Grovio</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #D35F0E 0%, #b84d0a 100%); padding: 30px; text-align: center;">
            <img src="https://grovio-gamma.vercel.app/logo.png" alt="Grovio" style="height: 50px; margin-bottom: 15px;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Re-authentication Required</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <h2 style="color: #1e3a8a; font-size: 24px; margin: 0 0 20px 0; text-align: center;">Verify Your Identity</h2>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                For security reasons, we need to verify your identity before proceeding with your request. This helps keep your Grovio account safe and secure.
            </p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h3 style="color: #1e3a8a; margin: 0 0 15px 0; font-size: 18px;">Why is this required?</h3>
                <ul style="color: #64748b; margin: 0; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">Sensitive account changes detected</li>
                    <li style="margin-bottom: 8px;">Unusual login activity</li>
                    <li style="margin-bottom: 8px;">Security policy compliance</li>
                    <li style="margin-bottom: 0;">Account protection measures</li>
                </ul>
            </div>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Click the button below to verify your identity and continue:
            </p>
            
            <div style="text-align: center; margin: 35px 0;">
                <a href="{{ .ConfirmationURL }}" style="background-color: #D35F0E; color: white; text-decoration: none; padding: 15px 40px; border-radius: 25px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 8px rgba(211, 95, 14, 0.3);">
                    Verify My Identity
                </a>
            </div>
            
            <div style="background-color: #e7f3ff; border: 1px solid #b3d9ff; padding: 15px; border-radius: 8px; margin: 25px 0;">
                <p style="color: #0066cc; font-size: 14px; margin: 0; font-weight: 600;">ℹ️ What happens next?</p>
                <p style="color: #0066cc; font-size: 14px; margin: 5px 0 0 0;">After verification, you'll be redirected back to complete your original request.</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #1e3a8a; color: white; padding: 25px; text-align: center;">
            <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Your Security is Our Priority</p>
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">The Grovio Team</p>
        </div>
    </div>
</body>
</html>
```

---

## Usage Instructions

1. **Copy the HTML code** for each email type
2. **Paste into Supabase** email template editor
3. **Replace variables** like `{{ .ConfirmationURL }}` with Supabase's actual variables
4. **Test the templates** by sending test emails
5. **Customize colors** if needed (all colors are defined in the CSS)

## Available Variables

- `{{ .ConfirmationURL }}` - The confirmation link
- `{{ .Token }}` - The confirmation token
- `{{ .TokenHash }}` - Hashed token
- `{{ .SiteURL }}` - Your site URL
- `{{ .Email }}` - User's email address
- `{{ .Data }}` - Additional data
- `{{ .RedirectTo }}` - Redirect URL after confirmation

All templates use Grovio's brand colors and professional styling with responsive design.
