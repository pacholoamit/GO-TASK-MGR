package main

import (
	"fmt"
	"log"

	"github.com/spf13/cobra"
)

var (
	rootCmd = &cobra.Command{
		Use:   "GO-TASK-MGR",
		Short: "A simple task manager",
		Long:  "A simple task manager written in Golang & Typescript",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("Hello World!")
		},
	}
)

func main() {
	if err := rootCmd.Execute(); err != nil {
		log.Fatal(err)

	}
}
