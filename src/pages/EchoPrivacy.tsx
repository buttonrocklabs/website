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
    "Echo records and transcribes meetings on your Mac. Your recordings, transcripts and voiceprints stay on the Mac, there are no accounts, and there is no analytics.",
  );

  return (
    <EchoDocPage
      eyebrow="Echo Privacy Policy"
      title="Your recordings stay on your Mac."
      intro="Echo is a Mac app from Button Rock Labs, LLC that records meetings, transcribes them and writes a summary. This page explains what Echo does with your information. Last updated: October 2026."
    >
      <EchoSection heading="What stays on your Mac">
        <p>
          Everything Echo makes from a meeting is stored on your Mac: the audio, the transcript, the summary, and the speaker names you give it. Transcription, speaker recognition and summaries all run on your Mac.
        </p>
        <p>
          Echo remembers the voices of people you name, so it can label them in later meetings. These voiceprints are stored on your Mac with your other Echo files.
        </p>
        <p>
          Summaries are written by Apple's on-device model, so the text of your meeting is not sent to a server to be summarized.
        </p>
      </EchoSection>

      <EchoSection heading="No accounts, no analytics">
        <p>
          Echo has no sign-in and no account. We do not run analytics, tracking, advertising or crash reporting inside the app, and we do not collect or receive your recordings, transcripts, names or voiceprints. Button Rock Labs has no copy of anything you record.
        </p>
      </EchoSection>

      <EchoSection heading="The one time Echo uses the internet">
        <p>
          The first time you open Echo, it downloads the speech and speaker models it needs to work on your Mac. These downloads come from huggingface.co. After the models are on your Mac, Echo reuses them.
        </p>
        <p>
          The download is a request for a model file. It carries none of your recordings, transcripts or names. As with any web request, Hugging Face can see the technical details of the connection, such as your IP address, under its own privacy policy.
        </p>
      </EchoSection>

      <EchoSection heading="Microphone and system audio">
        <p>
          Echo asks macOS for permission to use your microphone and to capture the audio playing on your Mac. It listens only while you are recording, and you can turn either permission off at any time in System Settings.
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
