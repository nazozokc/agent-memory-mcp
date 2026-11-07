{
  description = "agent-memory-mcp development environment";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { nixpkgs, ... }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
      ];
    in
    {
      devShells = nixpkgs.lib.genAttrs systems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            name = "schrun";
            packages = [
              pkgs.bun
              pkgs.vite
            ];
            shellHook = ''
              echo "[devShell:agent-memory-mcp] bun $(bun --version)"
            '';
          };
        }
      );
    };
}
