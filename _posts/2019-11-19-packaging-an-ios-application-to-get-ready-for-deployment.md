---
layout: post
title: Packaging an iOS Application to get ready for Deployment
permalink: expansion-on-from-packinging-to-enterprise/
date: 2019-11-19 22:16 +0200
---

So I realise I know very little about how to publish an application on iOS and that there are multiple different solutions for publishing an application.

It depends on who your customer is. This is all about finding the right way to reach your users. Your users could be the general public or business and education customers. Depending on who your app is for, there are different ways to distribute it.

Namely 4 solutions:

1. Ad-Hoc
1. AppStore
1. In-House
1. Custom Apps

In this post I will do my best to walk through each of these in depth and uncover any edge cases.

![Deployment methods](assets/images/Deployment/deployment-methods.png)

> How do you determine which path is the most appropriate for you? This depends on a number of factors, and some questions you might ask along the way include who's the audience for this app.

#### Some questions to keep in mind.

Who's going to maintain the source code?
Are you building the app for you or for someone else?
Is someone buying this app for their employees or students to use?

All of this comes down to asking who, and we can focus that on who was using the app and who is buying the app. Knowing that the customer and the user are not always the same person or entity is critical to mastering the different ways that apps can be distributed and figuring out where your app fits.

| If you can identify your audience, it becomes a lot easier to pick the right distribution mechanism. Most often, an individual is the both the customer and the user.

`Ad hoc` distribution lets you distribute to a limited number of devices that you choose for testing, and the `App Store` lets you distribute apps to the general public.

Now, sometimes when dealing with the business and education market, the customer is actually an organization, and they're purchasing apps on behalf of a group of users who will use those apps on either devices that that organization provides to them or on their own devices.

So there are two different ways that you can distribute apps in this scenario, in house and custom apps, and those both let you distribute apps privately to organizations.

Your app might have different reasons to use all of these distribution methods at different times in its lifetime or simply live in one of them, and different distribution mechanisms are associated with different types of memberships in the Apple developer programs.

We're going to walk through each of these distribution methods today.

The expectations around each and everything that you need to know to figure out where your app fits. We'll do this by following an app on a distribution journey from its very beginnings as a prototype, through the App Store, and through being customized for a business to be distributed privately in a few different ways.


But how would you actually get this prototype running on your devices?

> You can sign into Xcode with your Apple ID and leverage the free account that comes with it, called the `Personal Team`.

This enables you to explore the SDK and test apps on your device. You can only deploy a limited number of apps to a few devices, and they expire after a few days, so this isn't a real distribution method.

You build and run your app. Xcode installs it on your device, but in order for it to be able to launch, you'll need to trust your developer certificate on your device.

This is what that process looks like. You can trust the developer certificate by going into settings, general, profiles, and device management.

Here are a few best practices to keep in mind for personal teams. These accounts are really meant for learning. The assumption is that you're going to be deploying to devices that you own, and this isn't for distribution beyond your own devices.

Some capabilities like CloudKit, Siri, or APNS aren't available, and there's no way to publish apps to the store with this program or debate a testing with other users.

This can be summarized with the image below.

![Setting up for Distribution](assets/images/Deployment/appleid.001.png)

# Ad hoc Distribution

Membership in the Apple Developer Program is required in order to distribute an app to others.

So, this is the point where if you don't already have an account, most developers would sign up, either as a company or an individual, and once you're signed up, you're ready to start distributing to others. When you leverage ad hoc distribution, a limited number of users can install your app directly from their devices for testing.

The process requires that you register their device from the developer website, and there are a limited number of devices that you can register for both development and testing.

That's 100 devices per product family per year. For your average user, registering a device involves connecting it to a Mac and getting the device identifier, either from the finder's sidebar or retrieving it from Xcode, which means that you as a developer would need physical possession of their device. You then take that identifier and add it to the Apple developer website, and once you have their device registered, you're ready to create a build and install it for them. There are several different alternatives for installing ad hoc builds for testers. You can tether the device to your Mac and install with Xcode or Apple configurator, which is available on the Mac App Store, or you can host the app somewhere and enable over-the-air installation.

This is a manual way of achieving a limited distribution to a small group.

This program is designed to let you deploy to registered devices for the purpose of testing.

It's not a long-term or scalable distribution solution, and the provisioning profiles used to sign these apps expire yearly, so eventually the apps will stop working or need to be re-signed.

For larger teams, it's really important to take note of the device limits.

It can be hard to develop for new products if you run out of devices, which is why you have to be careful when using development devices for testers. These device limits are reset once per year, and if you're curious about when your device counts are going to be reset for your account, you can go to the member page on the developer website and look at the reset date. Ad hoc distribution gave us the ability to test with a few users. You quickly realize that ad hoc distribution isn't scalable as the number of people who want to test the app grows. So, let's talk about the App Store. The App Store offers a much better way to do beta testing for a large group of users. User interest in LunchControl is growing, and you want to expand your audience to include more testers. TestFlight makes it really easy for both developers and users to try out apps, and installation and updates are simple.

You could scale up to 10,000 testers. The builds last for three months, and for a user, installing an app is a familiar and simple process.

TestFlight beta builds for external testers do go through app review.

So, you need to make sure that you're following the App Store review guidelines before submitting, and the app needs to be stable and ready for a broader audience to test.

However, if you're making a build available to only members of your App Store connect team, review isn't required. And TestFlight is only available to members of the Apple Developer Program. TestFlight is built right into App Store Connect.

For those of you who are only familiar with the Apple Developer Enterprise Program and have probably never used App Store Connect before, this is what it looks like.

App Store Connect enables you to easily upload, submit, and manage your apps on the App Store. All of your TestFlight builds are available to see here, and you can invite testers to test your app. Testers can install your app from the TesFlight app on their devices. Once you invite a tester in TestFlight, they will receive an email invitation to beta test your app.

They can review all of the testing details that you provide and install the app to start testing right away. Once you're satisfied with the stability of your built, the next step is submitting to the App Store. For LunchControl, you've made some updates, added features based on feedback from your beta testers, and really iterated on your design. You're ready to list the app for sale, and you've even updated your app icon. You've done the hard work to get your app ready for submission.

Let's consider who the user and who the customer is here. Both are the general public, which makes this app appropriate for the public app store. Any individual can download and use your app, and the person who is buying it is also the person who's using it.

Here are a few things you should know about how App Store distribution works.

Both individuals and organizations can sign up for the Apple Developer Program to distribute to the App Store. Apps are available to the general public based on the markets that you choose to support, and the apps are hosted and reviewed by Apple.

This means that developers are expected to know and follow the App Store review guidelines.

It's also expected that you keep current. This means supporting new hardware and screen sizes, modern APIs, and new features, like all of the exciting things that we've announced this week. And just to reiterate, the App Store is appropriate for apps that are for the general public, which means that if you're building an app for the employees of a specific company to use, the public App Store is probably not the most appropriate place for it. Let's talk about a few more scenarios that developers might run into in the App Store. First, let's talk about the ability for a customer to purchase your app in bulk for a group of users. There are programs in place that enable you to do this. For LunchControl, a bunch of your friends are teachers at a local school, and their school wants to purchase the app in bulk for all of the faculty to use. As a developer, if you want to offer them a discount, you need to make sure that this is enabled in App Store Connect. In this case, your user is still the general public. So a group of teachers who would be using your App Store app, but the customer that's doing the purchasing is actually the school that they're working for.

Customers use Apple Business Manager or Apple School Manager to purchase apps like LunchControl from the App Store in bulk and distribute them to their users.

To verify that an education customer can purchase your app at a discount, you would take a look at the pricing and availability section in App Store Connect.

The default availability option for an app is available at a reduced price for educational institutions. If the educational institution purchases 20 or more licenses, and you have this enabled for them. They'll receive a 50 percent discount, and Apple School Manager is required for them to make this purchase.

Next, I want to discuss proper versioning for an app and how to handle adding additional features. As LunchControl grows in popularity, more and more feature requests are coming in, and more organizations start to become interested in leverage the app. Some users or organizations may ask you to add features that may not make sense for your entire audience, but you need to be careful about versioning your app in the app store appropriately. As you start to expand your customer base and consider offering multiple versions of your app on the store to various clients or even variations of your app for different types of users, like if having an admin and a regular version made sense for you, you want to handle versioning and your app store presence appropriately. This is what could happen if LunchControl doesn't manage their App Store presence properly. This is actually a real example from the App Store, just using the names from Liquid Oxygen Company and LunchControl.

Don't do this. When a user searches the App Store for a given name, this is what they might see if you version your app this way. They have no idea which app to pick, and if they pick the wrong one, they might not be able to log in or use it and might not behave in a way that's expected. This is a really frustrating experience for a user, and it's easily overcome by managing your versions better in software and moving your customer base forward as you make changes to your app and your product. What developers should do instead is consolidate app versions as much as possible. Ideally, it's one app, just like you see here on the left. This does require more development work, but in the end it's a much better customer experience, and if you as a developer start getting requests for lots of different customized versions of your app, it might be a good time to talk about how you could deliver those versions privately using custom apps, which we'll get into in a few minutes. The final App Store scenario I want to cover is building an App Store app for someone else. Your company, Liquid Oxygen, LLC, might be approached by a customer to build their own public facing app. In this case, we're going to talk about Liquid Oxygen being approached by a restaurant chain, Taco Bar, to create their App Store app for them. Taco Bar loves what you've done with LunchControl and really wants you to build them an app where customers could place orders, find the Taco Bar locations near them, and pay for their food. They currently don't have an App Store presence, so this would be their flagship app, and you, as a developer, don't want to give Taco Bar your intellectual property. In this scenario, the user of your app is still the general public, and the customer is actually Taco Bar.

You would be building an app for Taco Bar for their customers while still maintaining control of your intellectual property and running Liquid Oxygen, LLC. This is a brand-new app that will have a separate bundle ID and will exist on the App Store alongside LunchControl.

This is not simply publishing the same app under a different customer name.

It's a new and distinct experience. So, how would Liquid Oxygen work with Taco Bar as a third-party developer when building an App Store app for them? What's the best way for them to work together? Taco Bar is hiring Liquid Oxygen to build an app and submit it to the store under their developer account.

The developer has to join Taco Bar's developer program and provide a build of the app for Taco Bar to submit to the store. This is what that workflow should look like.

The two developer roles that Taco Bar should assign to Liquid Oxygen are Developer and Marketing. This would allow them to upload bills and provide marketing metadata like the app's description and screen shots. The admin role should remain internal to Taco Bar. This enables Taco Bar to control TestFlight distribution, pricing, submission, and go live on the App Store. The app manager role should also remain internal. Here's what it looks like to add and manage users in App Store Connect. Users with the admin and app manager roles can create and edit users and also restrict a user's access to specific apps in the account.

Make sure to limit third-party developer access to only those apps that they're working on.

But note, user access cannot be restricted to specific apps on the developer site.

Users will have access to all of the bundle IDs on the developer site.

You can see here that Tracy is the developer, and she has access to the Taco Bar app only.

And if LunchControl and Liquid Oxygen, LLC, were no longer to have a relationship with Taco Bar, the customer could always remove them as a third-party developer later on.

If you're developing an app for a business, that business is the only one allowed to submit to the App Store. That means that apps must be submitted under client accounts, and customers of Taco Bar are going to expect to be downloading an app from Taco Bar, Ltd., not from Liquid Oxygen, LLC. For more information on this, you can review to App Store review guidelines section 5.2. Powerful roles like admin and app manager should be limited for third-party developers, and customers should also limit app access to only the apps that they'll be working on, and you should also follow the best practices for app versioning that we discussed. That concludes our discussion about the different scenarios where you would distribute a public-facing app through the App Store. For the remainder of the session, we're going to talk about two ways to distribute apps that are customized for a business, intended to be used privately and internally by that business. The first one we'll talk about is in-house distribution. Let's check back in on LunchControl.

Exciting things are happening, and Acme Company has approached you to build them a custom version of LunchControl for their corporate cafeteria and catering services so that their employees can order food and have the same great experience that you offer in your app.

This would mean incorporating their back-end system into the app and building a totally customized version for them. In this case, Acme Company is going to be the customer purchasing a custom app for a group of users who happen to be their employees.

We'll call it Acme Co. CafÃ©. Knowing that the audience for this app isn't public, it's the employees of a company, it's apparent that a public app store isn't appropriate for this use case. When we think about apps for internal use, there are two distribution methods that come to mind, in-house and custom apps.

In a previous world, Acme Company would probably have an Apple Developer Enterprise Program account and would utilize in-house distribution to deploy this app.

For a very long time, this was the only way to do it. But recently, we've enabled the ability for these types of apps to be hosted on the App Store's infrastructure via custom apps, and there are a host of benefits to doing so. While the Apple Developer Enterprise Program still exists, it's no longer the standard mechanism for distributing private internal apps. There are some exceptions where it still may be appropriate, but for the vast majority of those building private internal apps, custom apps is going to be the way forward. In-house distribution, we'll just cover it so that you know how it works if you do run into it. So, in-house distribution enables you to control the entire distribution process and host the app yourself.

It requires membership into the Apple Developer Enterprise Program, but there are strict eligibility requirements to get into that program, and it really is meant for those cases that really can't be solved by custom app distribution. Regions where Apple business manager doesn't work, use cases for state and federal government, or use cases where there are other intellectual property issues could still qualify for in-house distribution. Organizations utilizing in-house distribution should own and maintain the source code so that they can do their own build to maintain the project.

Distribution is handled completely outside of the App Store by the organization and is usually done by MDM. If you do find yourself in a situation where you're leverage in-house distribution, there are a few things that you should be aware of.

First and foremost, the apps that you deploy using in-house distribution must only go to your employees and cannot be made available to others. Apps are signed by the organization with a distribution certificate, and that certificate needs to be protected. If it were to be compromised or revoked for any reason, all of the apps that you deployed with that certificate would stop working immediately, and they would need to be re-signed and redeployed. As you might imagine, that could be catastrophic for a business. Additionally, certificates will expire every three years, and the provisioning profiles expire annually. So you need to manage that certificate lifecycle and plan for frequent releases of your app that are aligned with it.

Beta testing and hosting of the apps needs to be handled by the organization and MDM, and there's no TestFlight access for enterprise accounts. Apps are also going to need periodic access to the internet, which makes it very difficult to deploy apps in air gap networks.

Based on what we just talked about, in-house distribution isn't going to be a good fit for Acme. Let's move onto Custom Apps. This is the new way forward.

This scenario could work one of two ways. The developer could simply offer the app for sale to them via Custom Apps under their own account, which would protect their intellectual property. This could be described as business to business, and this is actually the way that Custom Apps used to work. Alternatively, the developer could negotiate with Acme Company and provide them source code, and they would handle the submission of the Custom App themselves under their own Acme account, which we could describe as business to self. Either way, Custom Apps is the right solution.

How does Custom App distribution work? Custom Apps are part of the Apple Developer Program and are hosted by Apple in Apple Business Manager.

Custom Apps used to be available only to developers selling an app to another organization, but you can now use it to distribute internally to your own employees just like you would leverage in-house distribution. This make it much easier to distribute apps to your employees, and Custom Apps works for distributing to employees, partners, clients, franchisees, or affiliates. Customers can also distribute licenses via MDM or leverage redemption codes. For those of you who are used to the Apple Developer Enterprise Program, Custom Apps offers a lot of benefits. You'll only need one program to manage both your App Store and your internal apps. The apps won't expire, so you don't need to worry about distribution certs being revoked or expiring.

While with in-house distribution you could only distribute to employees, Custom Apps actually allows you to reach a broader audience, including business affiliates.

It's also easier to work with third-party developers because you can get and distribute an app from them without having access to the source code, and there's no re-signing of binaries involved. You can also take advantage of the App Store's auto update infrastructure, features like caching and app thinning as well as the TestFlight and App Store Connect tools. Here's how you would actually go about submitting a Custom App.

First, you would confirm that your account is properly set up to support Custom Apps.

Both app agreements need to be active, and you need to provide banking and tax information.

You can leverage roles to define proper access for the project team once you have the app set up. A developer would create a new app identifier in the member center of the developer website and also a new app record in App Store Connect.

Anytime that you want to list a custom app for sale, you need to create a new app ID and a new app record. The same bundle identifier cannot be available in both the public App Store and privately as a custom app. They're totally separate apps with separate bundle InDesign. Next, you would upload a build and attach it to the working version in App Store Connect. Beta testing would be done with TestFlight.

When Beta Testing is complete, all of the app metadata and finalized marketing material should be verified and added. You would then list the app for sale as a custom app in the pricing and availability section. Note, once an app is submitted for review as either a custom app or a public app, you can't go back and change the audience from public to private for vice versa later on. To list the app for sale as a custom app for business, you need to provide the customer's DEP ID and organization name.

The DEP ID is a unique identifier given to the organization when they enroll in Apple Business Manager. Finally, you would submit the app for review.

Once it's approved and available, you customer can purchase and distribute the app.

Purchasing is done through Apple Business Manager. The customer would enroll at business.apple.com, and with this program, they can buy App Store apps, custom apps and books in bulk, and deploy to their devices and users. They can also do app license management. Note that this needs to be set up in advance of you listing the app for sale as a custom app because you need that DEP ID and organization name to distribute the app to them. And Custom Apps will also be available for Apple School Manager this fall. This is what Apple Business Manager looks like.

Your customer will see the app that you are listing for sale for them under the Custom Apps section. Let's review what this process looks like end-to-end for both the customer and the developer. The customer first provides you with their organization name and DEP ID from Apple Business Manager. Once you have that, when you set up the App in App Store Connect, in the pricing and availability section, you select to make it available privately as a Custom App for business and specify that DEP ID and organization name. Once the app is submitted and approved, the customer can then go and purchase licenses of it from Apple Business Manager. If for some reason you aren't able to submit a custom app or your customer isn't able to see an app that you've assigned to them, here are a few places that you can troubleshoot. First, on the developer side, make sure both the free and paid agreements are complete as well as all of your banking information. If the customer isn't able to see the app, make sure that Custom Apps are enabled for their account under settings and enrollment info in Apple Business Manager. It also may take a few minutes for the app to become visible in Apple Business Manager, so just give it a little bit of time, and you can also consult the App Store Connect help page for more information. Here are a few things to keep in mind about Custom Apps. Customers need to have an Apple Business Manager account to purchase your app. Apps have to support the countries that they will be distributed in. By default, an app is set up to support all territories in App Store Connect, and you shouldn't change this unless you really need to.

It's expected that if you're utilizing redemption codes for distribution that they won't be made publicly available, and you'll instead make sure they make it into the hands of your specific users. This is a new app that needs to go through app review, and the review team is going to need to be able to access the full functionality of the app.

And once submitted, apps can't be moved between public and private availability.

That concludes Custom Apps. We've covered the four distribution methods that you have to choose from, and the easiest way to decide which is right for you is to think about the audience for your app is public or private. Ad Hoc lets you distribute to a limited private audience for testing. The App Store lets you distribute apps to the general public, and In-House and Custom App distribution let you distribute apps privately. Let's review the distribution scenarios that we talked about today. What if the app is for the general public? If the app is for the general public, it belongs on the App Store.

What if you don't want to give up your intellectual property to an enterprise.

If you don't want to give up intellectual property, you can leverage Custom Apps to deliver them a private, completed app. And if you're writing an app for the company where the audience is the general public, you can also deliver them a binary to upload to their App Store Connect account. What if your customer doesn't have an MDM solution? The Custom Apps program along with MDM can be used to deliver apps to customers who don't have MDM. What if you're being paid as a consultant to build an app for a company? So you can work in both the App Store and the Custom Apps program to, as a third-party developer, to deliver an app to someone else.

What if Apple Business Manager isn't available for my customer? So, if Apple Business Manager isn't available, your customer should be able to leverage in-house distribution providing that they're building an app for their employees. And what if the app is employee facing? Employee facing or private apps can be distributed with both Custom Apps or In-House, and what if you want to distribute an app to your own organization? You can distribute to your own organization using Custom Apps or the In-House program.

To conclude this presentation, I want to leave you with a quote from a colleague.

"Apps are like cannonballs. It's better to know where they're going before they deploy." Apple wants you to be successful and scale your app in the smartest possible way, which means thinking carefully about the user and the customer, managing your versions appropriately, and knowing and understanding the guidelines or our developer programs. If you understand how this works up front, you can pick the right distribution mechanism for your app and deploy it to your users without any friction.

For more information, this is developer site, this is session 304, and please visit us at the lab on Friday and also check out What's New in Managing Apple Devices if you want to learn more. Thank you, and enjoy the rest of the conference.


Developer
