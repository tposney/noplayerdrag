function myCanDrag(wrapped, ...args) {
	const canDrag = wrapped(...args);
	try {
		if (
			!game.user.isGM &&
			(game.settings.get("noplayerdrag", "disablePlayerDrag") ||
				(game.settings.get("noplayerdrag", "disablePlayerDragCombat") && this.inCombat))
		)
			return false;
	} catch (err) {
    console.err(err);
	}
  return canDrag;
}

Hooks.once("ready", function () {
	if (game.modules.get("lib-wrapper")?.active) {
		libWrapper.register("noplayerdrag", "Token.prototype._canDrag", myCanDrag, "WRAPPER");
	}
});

Hooks.once("init", () => {
	game.settings.register("noplayerdrag", "disablePlayerDrag", {
		name: `Disable token drag`,
		hint: `Non GM players cannot drag tokens and must use WASD/Arrow keys`,
		scope: "world",
		config: true,
		type: Boolean,
		default: false,
	});
	game.settings.register("noplayerdrag", "disablePlayerDragCombat", {
		name: `Disable drag token in combat`,
		hint: `Non GM players cannot drag tokens which are in combat and must use WASD/Arrow keys`,
		scope: "world",
		config: true,
		type: Boolean,
		default: false,
	});
});
