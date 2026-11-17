import {
  ECHO_SUPPORT_EMAIL,
  EchoDocPage,
  EchoSection,
  echoLinkClass,
  useEchoMeta,
} from "@/components/EchoDoc";

export default function EchoPrivacy() {
  useEchoMeta(
    "Echo Privacy Policy | Button Rock Labs",
    "Echo records and transcribes meetings on your Mac. Your recordings stay on the Mac unless you turn on Cloud storage. There are no accounts and no analytics.",
  );

  return (
    <EchoDocPage
      eyebrow="Echo Privacy Policy"
      title="Your recordings stay on your Mac unless you say otherwise."
      intro="Echo is a Mac app from Button Rock Labs, LLC that records meetings, transcribes them and writes a summary. This page explains what Echo does with your information. Last updated: November 2026."
    >
      <EchoSection heading="What stays on your Mac">
        <p>
          Everything Echo makes from a meeting is stored on your Mac: the audio, the transcript, the summary, and the speaker names you give it. Transcription, speaker recognition and summaries all run on your Mac.
        </p>
        <p>
          Echo remembers the voices of people you name, so it can label them in later meetings. These voiceprints are stored on your Mac with your other Echo files and are never sent anywhere.
        </p>
        <p>
          Summaries are written by Apple's on-device model, so the text of your meeting is not sent to a server to be summarized.
        </p>
      </EchoSection>

      <EchoSection heading="No accounts, no analytics">
        <p>
          Echo has no sign-in and no account. We do not run analytics, tracking, advertising or crash reporting inside the app, and Button Rock Labs does not receive your recordings, transcripts, names or voiceprints, and has no copy of anything you record.
        </p>
      </EchoSection>

      <EchoSection heading="Cloud storage (optional, off until you set it up)">
        <p>
          Echo has a Cloud tab in Settings. It is empty and does nothing until you type in a web address (it must start with https) and, if the service needs one, an access key. You then choose Verify and Confirm. Echo sends nothing before you confirm. Echo has no built-in address, and Button Rock Labs does not run a server for it.
        </p>
        <p>
          After you confirm, Echo sends each finished meeting to the address you typed, and to no one else. That happens when Echo opens, about three seconds after a meeting changes, and when you choose Sync now. Each meeting is three files: the audio, a text version (meeting.md) and a data version (meeting.json). The text and data files hold the transcript, summary, action items and speaker names. Audio is included by default, and you can turn that off to send text only. Voiceprints are never sent. Echo does not follow redirects.
        </p>
        <p>
          The address and key are kept in your Mac's Keychain. Choose Disconnect and Echo stops sending and deletes both. What the service does with your files is up to you and that service, so read its privacy policy before you use it. Files already sent stay where you sent them until you delete them there.
        </p>
      </EchoSection>

      <EchoSection heading="The other time Echo uses the internet">
        <p>
          Echo needs speech and speaker models to work on your Mac, about 800 MB. It downloads them from huggingface.co when you choose Download Speech Models in the Welcome window, or when you first choose Record Now or Import Now. Nothing downloads before that. Once the models are on your Mac, Echo reuses them and transcription works offline.
        </p>
        <p>
          The download is a request for model files. It carries none of your recordings, transcripts or names. As with any web request, Hugging Face can see the technical details of the connection, such as your IP address, under its own privacy policy.
        </p>
      </EchoSection>

<EchoSection heading="Microphone and system audio">
        <p>
          Echo asks macOS for permission to use your microphone and to capture the audio playing on your Mac. Echo listens while you are recording. It also listens for about 3 seconds when you choose Allow Speaker in the Welcome window, and while you have the Check microphone button running in Settings (it stops after 30 seconds at most). Nothing from those checks is saved. You can turn either permission off at any time in System Settings.
        </p>
      </EchoSection>

      <EchoSection heading="Recording other people">
        <p>
          Laws about recording conversations differ by place. Let the people in your meeting know you are recording before you start.
        </p>
      </EchoSection>

      <EchoSection heading="Deleting your data">
        <p>
          Your Echo files are ordinary files on your Mac, so you control them. Delete a recording inside Echo, or remove Echo's data folder, and the audio, transcript, summary and voiceprints for it are gone. Because Button Rock Labs never receives this data, there is nothing for us to delete on our side.
        </p>
      </EchoSection>

      <EchoSection heading="Changes to this policy">
        <p>
          If Echo's handling of your information changes, we will update this page and the date at the top before the change ships.
        </p>
      </EchoSection>

      <EchoSection heading="Contact us">
        <p>
          Questions about privacy:
        </p>
        <p>
          <strong className="text-foreground">Button Rock Labs, LLC</strong><br />
          Lyons, Colorado<br />
          <a href={`mailto:${ECHO_SUPPORT_EMAIL}`} className={echoLinkClass}>{ECHO_SUPPORT_EMAIL}</a>
        </p>
      </EchoSection>
    </EchoDocPage>
  );
}
