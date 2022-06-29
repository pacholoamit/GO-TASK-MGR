package utils

import (
	"fmt"
)

func NonExistentError(t string) error {
	return fmt.Errorf("%s does not exist", t)
}
