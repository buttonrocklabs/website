import { Link } from "react-router-dom";
import {
  ECHO_SUPPORT_EMAIL,
  EchoDocPage,
  EchoSection,
  echoLinkClass,
  useEchoMeta,
} from "@/components/EchoDoc";

const LOG_PATH =
  "~/Library/Containers/com.buttonrocklabs.meetingrecorder/Data/Library/Application Support/MeetingRecorder/meeting-recorder.log";

export default function EchoSupport() {
  useEchoMeta(
    "Echo Support | Button Rock Labs",
    "Get help with Echo, the Mac meeting recorder: how to contact support, find the log file and request a refund through Apple.",
  );

  return (
    <EchoDocPage
      eyebrow="Echo Support"
      title="Help with Echo."
      intro="Something not working, or a question about Echo? Write to us and a person will answer."
    >
      <EchoSection heading="Email us">
        <p>
          <a href={`mailto:${ECHO_SUPPORT_EMAIL}`} className={echoLinkClass}>{ECHO_SUPPORT_EMAIL}</a>
        </p>
        <p>
          Tell us your Mac model, your macOS version, what you expected and what happened. If Echo misbehaved, attach the log file described below.
        </p>
      </EchoSection>

      <EchoSection heading="Find Echo's log file">
        <p>
          Echo keeps a plain text log that helps us see what went wrong. It holds app events and errors, and it is only shared if you send it to us.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>In Finder, choose Go, then Go to Folder.</li>
          <li>Paste this path and press Return:</li>
        </ol>
        <p>
          <code className="block rounded-lg bg-muted px-4 py-3 text-sm text-foreground break-all">{LOG_PATH}</code>
        </p>
        <p>
          The file is named <span className="text-foreground">meeting-recorder.log</span>. Attach it to your email.
        </p>
      </EchoSection>

      <EchoSection heading="Common questions">
        <p>
          <strong className="text-foreground">Echo needs the internet when I first open it.</strong> It downloads its speech and speaker models once. After that it works without a connection.
        </p>
        <p>
          <strong className="text-foreground">I do not get summaries.</strong> Summaries use Apple's on-device model, so they need a Mac that supports Apple Intelligence with it turned on in System Settings.
        </p>
        <p>
          <strong className="text-foreground">Echo cannot hear my meeting.</strong> Check System Settings, Privacy and Security, and make sure Echo is allowed to use the microphone and to capture system audio.
        </p>
      </EchoSection>

      <EchoSection heading="Request a refund">
        <p>
          Echo is sold through the Mac App Store, so Apple handles refunds. Go to{" "}
          <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer" className={echoLinkClass}>
            reportaproblem.apple.com
          </a>
          , sign in with the Apple Account you bought Echo with, choose Echo and select Request a refund. The link in your Apple purchase receipt email opens the same page.
        </p>
      </EchoSection>

      <EchoSection heading="Privacy">
        <p>
          Read how Echo treats your recordings in the{" "}
          <Link to="/echo/privacy" className={echoLinkClass}>Echo privacy policy</Link>.
        </p>
      </EchoSection>
    </EchoDocPage>
  );
}
