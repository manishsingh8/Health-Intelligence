import DB from "@/assets/icons/database.svg";
import Api from "@/assets/icons/api.svg";
import Audit from "@/assets/icons/audit.svg";
import Agent from "@/assets/icons/agent.svg";
import Search from "@/assets/icons/elastic.svg";
import Services from "@/assets/icons/services.svg";
import Vault from "@/assets/icons/vault.svg";
import Sftp from "@/assets/icons/sftp.svg";
import Amazon from "@/assets/icons/amazon.svg";
import Config from "@/assets/icons/config.svg";
import Inbox from "@/assets/icons/inbox.svg";
import Scheduler from "@/assets/icons/scheduler.svg";

export const getIcon = (iconType?: string) => {
  switch (iconType) {
    case "db":
      return <img src={DB} alt="Database Icon" className="w-10 h-12" />;
    case "api":
      return <img src={Api} alt="API Icon" className="w-10 h-12" />;
    case "audit":
      return <img src={Audit} alt="Audit Icon" className="w-10 h-12" />;
    case "logs":
      return <img src={Agent} alt="Logs Icon" className="w-10 h-12" />;
    case "search":
      return (
        <img src={Search} alt="Elastic Search Icon" className="w-10 h-12" />
      );
    case "services":
      return <img src={Services} alt="Services Icon" className="w-10 h-12" />;
    case "vault":
      return <img src={Vault} alt="Vault Icon" className="w-10 h-12" />;
    case "sftp":
      return <img src={Sftp} alt="SFTP Icon" className="w-10 h-12" />;
    case "amazon":
      return <img src={Amazon} alt="Amazon Icon" className="w-10 h-12" />;
    case "config":
      return <img src={Config} alt="Config Icon" className="w-10 h-12" />;
    case "inbox":
      return <img src={Inbox} alt="Inbox Icon" className="w-10 h-12" />;
    case "scheduler":
      return <img src={Scheduler} alt="Scheduler Icon" className="w-12 h-12" />;
    default:
      return <span className="text-xl">🔧</span>;
  }
};
