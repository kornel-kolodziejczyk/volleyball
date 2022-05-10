import { IPlayer } from "../interfaces/player";
import { ISection } from "../interfaces/section";

export const updatePlayer = (players: IPlayer[], player: IPlayer, section: keyof ISection, item: string, value: number): IPlayer => {
  const updatedPlayer = { ...player };

  if (section === "serves") {
    updatedPlayer.serves[item as keyof typeof updatedPlayer.serves] += value;
    const { correct, aces, faults } = player.serves;
    const totalAmount = players.reduce((sum, player) => sum + player.serves.correct + player.serves.aces + player.serves.faults, 0) + value;
    const sectionSum = correct + aces + faults;

    let involvement = sectionSum / ((1 / players.length) * totalAmount);
    if (involvement > 1) involvement = 1;

    if (sectionSum > 0) {
      const overallPart = 10 / (sectionSum * 2);
      updatedPlayer.serves.overall = (correct * overallPart + aces * overallPart * 2) * involvement;
    } else {
      updatedPlayer.serves.overall = 0;
    }
  } else if (section === "attacks") {
    updatedPlayer.attacks[item as keyof typeof updatedPlayer.attacks] += value;
    const { correct, spikes, faults } = player.attacks;
    const totalAmount = players.reduce((sum, player) => sum + player.attacks.correct + player.attacks.spikes + player.attacks.faults, 0) + value;
    const sectionSum = correct + spikes + faults;

    let involvement = sectionSum / ((1 / players.length) * totalAmount);
    if (involvement > 1) involvement = 1;

    if (sectionSum > 0) {
      const overallPart = 10 / (sectionSum * 2);
      updatedPlayer.attacks.overall = (correct * overallPart + spikes * overallPart * 2) * involvement;
    } else {
      updatedPlayer.attacks.overall = 0;
    }
  } else if (section === "receptions") {
    updatedPlayer.receptions[item as keyof typeof updatedPlayer.receptions] += value;
    const { correct, inaccurates, faults } = player.receptions;
    const totalAmount = players.reduce((sum, player) => sum + player.receptions.correct + player.receptions.inaccurates + player.receptions.faults, 0) + value;
    const sectionSum = correct + inaccurates + faults;

    let involvement = sectionSum / ((1 / players.length) * totalAmount);
    if (involvement > 1) involvement = 1;

    if (sectionSum > 0) {
      const overallPart = 10 / (sectionSum * 2);
      updatedPlayer.receptions.overall = (correct * overallPart * 2 + inaccurates * overallPart) * involvement;
    } else {
      updatedPlayer.receptions.overall = 0;
    }
  } else if (section === "blocks") {
    updatedPlayer.blocks[item as keyof typeof updatedPlayer.blocks] += value;
    const { correct, points, outs } = player.blocks;
    const totalAmount = players.reduce((sum, player) => sum + player.blocks.correct + player.blocks.points + player.blocks.outs, 0) + value;
    const sectionSum = correct + points + outs;

    let involvement = sectionSum / ((1 / players.length) * totalAmount);
    if (involvement > 1) involvement = 1;

    if (sectionSum > 0) {
      const overallPart = 10 / (sectionSum * 2);
      updatedPlayer.blocks.overall = (correct * overallPart + points * overallPart * 2) * involvement;
    } else {
      updatedPlayer.blocks.overall = 0;
    }
  }

  updatedPlayer.overall = (updatedPlayer.attacks.overall + updatedPlayer.serves.overall + updatedPlayer.receptions.overall + updatedPlayer.blocks.overall) / 4;

  return updatedPlayer;
};
