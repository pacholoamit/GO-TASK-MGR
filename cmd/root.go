package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var (
	// Used for flags.
	cfgFile     string
	userLicense string

	rootCmd = &cobra.Command{
		Use:   "GO-TASK-MGR",
		Short: "A generator for Cobra based Applications",
		Long: `Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
		Run: func(cmd *cobra.Command, args []string) {
			viper.WriteConfig()
		},
	}
)

// Execute executes the root command.

func init() {
	cobra.OnInitialize(initConfig)

	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.cobra.yaml)")
	rootCmd.PersistentFlags().StringP("author", "a", "YOUR NAME", "author name for copyright attribution")
	rootCmd.PersistentFlags().StringVarP(&userLicense, "license", "l", "", "name of license for the project")
	rootCmd.PersistentFlags().Bool("viper", true, "use Viper for configuration")
	viper.BindPFlag("author", rootCmd.PersistentFlags().Lookup("author"))
	viper.BindPFlag("useViper", rootCmd.PersistentFlags().Lookup("viper"))
	viper.SetDefault("author", "NAME HERE <EMAIL ADDRESS>")
	viper.SetDefault("license", "apache")
}

func Execute() error {
	return rootCmd.Execute()
}

func initConfig() {
	configDir, err := os.UserConfigDir()
	appDir := configDir + "/GO-TASK-MGR"
	confType := "yaml"
	confFileName := "GO-TASK-MGR"
	confFile := appDir + "/" + confFileName + "." + confType
	if cfgFile != "" {

		// Use config file from the flag.
		viper.SetConfigFile(cfgFile)
	} else {
		// Find home directory.

		cobra.CheckErr(err)

		// Search config in home directory with name ".cobra" (without extension).
		viper.AddConfigPath(appDir)
		viper.SetConfigType(confType)
		viper.SetConfigName(confFileName)
	}

	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		fmt.Println("No config file found")
		os.MkdirAll(appDir, 0700)
		os.Create(confFile)
		fmt.Println("Creating config file at " + confFile)
	} else {
		fmt.Println("Using config file:", viper.ConfigFileUsed())
	}

}
