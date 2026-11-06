{
  description = "agent-memory-mcp — MCP server for agent memory";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    treefmt-nix.url = "github:numtide/treefmt-nix";
  };

  outputs =
    inputs@{
      flake-parts,
      nixpkgs,
      treefmt-nix,
      ...
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];

      imports = [
        treefmt-nix.flakeModule
      ];

      perSystem =
        { system, config, ... }:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          # mkShellNoCC: コンパイラ不要なので stdenvNoCC を使い、direnv の読み込みを速くする
          devShells.default = pkgs.mkShellNoCC {
            name = "agent-memory-mcp";
            packages = [
              # ランタイム & テストランナー & パッケージマネージャ
              pkgs.bun
              # 型チェック & エディタの TS LSP バックエンド
              pkgs.typescript
              # プロジェクト設定入り treefmt (nix fmt と同じ挙動)
              config.formatter
              # JSON/JSONL の整形・検索 (~/.agent-memory の確認用)
              pkgs.jq
              pkgs.git
            ];
            shellHook = ''
              echo "[devShell:agent-memory-mcp] bun $(bun --version), tsc $(tsc --version)"
              echo ""
              echo "  Tasks:"
              echo "    bun install                 install dependencies"
              echo "    bun run src/index.ts        run the MCP server (stdio)"
              echo "    bun test                    run tests"
              echo "    bunx tsc --noEmit           type check"
              echo "    nix fmt                     format sources"
            '';
          };

          # -----------------------------------------------------------------
          # formatter
          # -----------------------------------------------------------------
          treefmt.config = {
            projectRootFile = "flake.nix";
            programs.nixfmt.enable = true;
            programs.prettier.enable = true;
            settings.global.excludes = [
              # bun.lock は trailing comma を含む JSON なので prettier 不可
              "bun.lock"
              "node_modules"
            ];
          };
        };
    };
}
