export default function getMissionData(missionId) {
    switch (missionId) {
        case "1":
            return {missionName: "Apollo 11", maxNuggetValue: 6};
        case "2":
            return {missionName: "Apollo 8", maxNuggetValue: 2};
        default:
            return {};
    }
}