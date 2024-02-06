---
title: My First Real Downgrade
subtitle: 
date: 1997-08-01
blurb: How Spam Nuked My Ability to Cybercommute
notes: 
publication: nyt_syndicate_guardian_of_london
---

Never, ever, respond to an email advertisement again. You'll be doing yourself and the rest of us trying to work or play on the Internet a big favor.

I've made a habit, perhaps even an ethic, of shrugging off commercial advances onto the Internet. Since the real estate in cyberspace is effectively infinite, I have tended to adopt an attitude of live and let live. Although at least twenty spam messages find their way into my mailbox each day, I've gotten pretty good at identifying the "subject lines" of advertisements and then deleting without even reading them.

But as I sit here in a hotel room in Edinburgh, attempting to file my weekly column via email to London, I realize that spam has effectively crippled my ability to conduct Internet tasks I used find easy. This means war.

Like many of you, I use a program called Eudora to send and receive email. No matter where I am or what service I've used to connect to the Internet, the Eudora software lets me identify the place on my home server where email is kept, and then send or receive messages. This way, even though my home server only has a New York phone number and I'm in Scotland, I can use the local UK dial-in number for the Microsoft Network or any other service where I have an account, and then hop over and get my email. No long distance calls required.

But this week, when I tried to reply to some email, I got a disturbing message: "Error 550, access denied." Access denied?

After a harrowing series of long distance calls with my Internet provider, I learned the painful truth. The same feature that allows me to send email from a foreign server allows tricky, ruthless spam advertisers to send email with no return address.

See, spammers know that most people hate them and that sending unwanted mail to millions of recipients is grounds for having their accounts terminated by their own access providers. To mask their own originating addresses, they have exploited the way the Internet passes mail from server to server. They use third-party hosts, like my service provider, as a relay for their mail. The routing headers imply, to anyone but the most educated Internet users, that the mail comes from the third party's mail server.

The problems this creates for Internet service providers can be catastrophic. First, relaying an extra few million email addresses puts a tremendous stress on the mail server, slowing down everybody's connections or even overloading the server altogether. Then, since the spam seems to coming from the innocent, third party server, annoyed recipients complain to the victimized service provider. More angry email and phone calls for them to process.

Worse, when other service providers detect that a large amount of spam mail is coming from the innocent, offending mail server, they often choose to block all mail from that server. Once this happens, no subscriber of the first provider can reach anyone on any of services that have blocked his own provider.

In an attempt to protect itself from abuse by spammers, my service provider is re-engineering its system so that hosts outside its own network are now unable to relay mail through its machines. This happens to include the hosts I have always used to send email when I'm on the road.

So, here I am in Scotland, filing this story to London through a long distance connection to my Internet provider in New York.

I know this sounds like a personal gripe -- I suppose it is. And I know there are other solutions to my problem. I can use telnet to connect to my server, but then I lose the capabilities of my regular mail program, like attaching files or automatically saving messages to my hard drive.

Likewise, as uber-techies inform me, my service provider could come up with better ways of filtering relayed mail so that they could recognize me but reject the spammers. Still, I don't see any of these critics lining up to write the code.

What really irks me is that spammers have succeeded in tangibly downgrading my Internet service. There are things I used to be able to do, that now I can't.

Solutions? For starters, if you want to avoid spam take your email address off your web page. Spammers use programs that automatically search web pages for addresses. Instead, spell it out, as in "rushkoff at inteport.net," and explain why you've done so.

Also, don't browse the Web from your regular account or with your regular email address. Any site you visit can collect and sell your address. Ask your service provider how to create a pseudonymous email address. You'll know that any email going there is unsolicited.

There's great information about how to stop spammers at http://spam.abuse.net and http://www.cauce.org. Visit them for more ideas on how to stamp out this plague.

In the meantime, if nothing else, never, ever reply. Just delete.
