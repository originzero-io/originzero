import GUISettings, { GUISettingsType } from "../models/GUISettings";

class GUISettingsRepository {
  static async get() {
    const guiSettings = await GUISettings.findOne({});
    if (guiSettings) {
      return guiSettings;
    }
    const defaultGUISettings: GUISettingsType = {
      viewport: { x: 0, y: 0, zoom: 1 },
      miniMapDisplay: "visible",
      groupBarDisplay: "visible",
      edgeType: "bezier",
      theme: "dark",
      nodeGroupMenuDisplay: false,
      paneClickPosition: { x: 0, y: 0 },
    };
    return defaultGUISettings;
  }

  static async save(newGuiSettings: GUISettingsType) {
    const guiSettings = await GUISettings.findOne({});
    if (guiSettings) {
      await GUISettings.findOneAndUpdate({}, newGuiSettings);
    } else {
      await GUISettings.create(newGuiSettings);
    }
  }
}

export default GUISettingsRepository;
