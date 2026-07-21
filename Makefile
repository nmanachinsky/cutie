.PHONY: dev build lint preview clean install help

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	pnpm install

dev: ## Start dev server (accessible from phone on local network)
	pnpm dev --host

build: ## Type-check and build for production
	pnpm build

lint: ## Run oxlint
	pnpm lint

preview: ## Preview production build locally
	pnpm preview

clean: ## Remove dist and node_modules
	rm -rf dist node_modules
